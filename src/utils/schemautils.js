// default type checking is string
const getZodType = (schema, field) => {
  if (schema.shape[field]) {
    if (schema.shape[field]._def.typeName === "ZodOptional") {
      return schema.shape[field]._def.innerType._def.typeName;
    } else {
      return schema.shape[field]._def.typeName;
    }
  }
};

const schemautils = {
  getZodType,
};

export default schemautils;
