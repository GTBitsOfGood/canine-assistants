export const getUserAssociatedFilter = (userId) => ({
  $or: [
    { partner: { user: userId } },
    { instructors: userId },
    { caregivers: userId },
    { volunteer: userId },
  ],
});
