export const env = (name, alt = undefined) => {
  const envValue = process.env[name] || alt;
  if (!envValue) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return envValue;
};
