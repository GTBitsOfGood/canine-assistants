// default type checking is string
const isFieldType = (schema, field, type = "zodString") => {
  return !(schema.shape[field] && schema.shape[field]._def.typeName === type);
};

const schemautils = {
  isFieldType,
};

export default schemautils;
