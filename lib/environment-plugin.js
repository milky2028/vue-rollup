export default function environmentPlugin(environment) {
  return {
    name: 'environment-plugin',
    resolveId(id) {
      return id.includes('environment') ? id : null;
    },
    load(id) {
      if (id.includes('environment')) {
        return environment;
      } else {
        return;
      }
    }
  };
}
