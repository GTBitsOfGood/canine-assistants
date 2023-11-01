/**
 * This file contains all the code for editing a dog form submisssion. It includes both editing and error validation.
 */

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dogSchema } from "@/utils/consts";
import { consts } from "@/utils/consts";

const EditDogContext = React.createContext();

export function useEditDog() {
  return useContext(EditDogContext);
}

export function EditDogProvider({ children }) {
  const [allDogsData, setAllDogsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(dogSchema.partial()),
  });

  useEffect(() => {
    fetch(`/api/dogs?fields=name,_id`)
      .then((res) => res.json())
      .then((data) => {
        setAllDogsData(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.data);
      });
  }, []);

  // All multi select dropdowns (whcich require API calls)
  const multiselects = ["caregivers", "instructors"];

  // All enum values and corresponding arrays
  const {
    deliveryArray,
    housingArray,
    leashArray,
    locationArray,
    genderPetArray,
  } = consts;

  const enums = {
    deliveryInformation: deliveryArray.map((enumValue) => {
      return { label: enumValue, value: enumValue };
    }),
    gender: genderPetArray.map((enumValue) => {
      return { label: enumValue, value: enumValue };
    }),
    location: locationArray.map((enumValue) => {
      return { label: enumValue, value: enumValue };
    }),
    toiletArea: leashArray.map((enumValue) => {
      return { label: enumValue, value: enumValue };
    }),
    housing: housingArray.map((enumValue) => {
      return { label: enumValue, value: enumValue };
    }),
    parents: allDogsData.map((dog) => ({ value: dog._id, label: dog.name })),
    caregivers: allUsers.map((user) => ({
      value: user._id,
      label: user.name,
    })),
    instructors: allUsers.map((user) => ({
      value: user._id,
      label: user.name,
    })),
    partner: allUsers.map((user) => ({
      value: user._id,
      label: user.name,
    })),
  };

  const dateFields = ["dateOfBirth", "grooming"];

  const contextValues = {
    isEdit,
    setIsEdit,
    enums,
    multiselects,
    register,
    handleSubmit,
    errors,
    control,
    dateFields,
    getValues,
    reset,
  };

  return (
    <EditDogContext.Provider value={contextValues}>
      {children}
    </EditDogContext.Provider>
  );
}
