module.exports = function override(config, env) {
    if (!config.resolve.alias) {
        config.resolve.alias = {'cldr$': 'cldrjs', 'cldr': 'cldrjs/dist/cldr'};
    }
    else {
        config.resolve.alias['cldr$'] = 'cldrjs';
        config.resolve.alias['cldr'] = 'cldrjs/dist/cldr';
    }
    return config;
  }