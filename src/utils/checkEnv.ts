const checkEnvVariable = (variable: string) => {
  const value = process.env[variable];
  if (!value) {
    throw Error(`Environmental variable not defined : ${variable}`);
  }
  return value;
};

export default checkEnvVariable;
