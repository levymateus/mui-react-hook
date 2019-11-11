module.exports = {
	roots: ['../test'],
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: './.config/tsconfig.json',
		},
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'scss'],
	transform: {
		'^.+\\.scss$': 'sass-jest',
	},
	// testRegex: '*\\.test\\.*\\.(tsx|js|scss)$',
};
