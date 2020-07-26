module.exports = {
	data() {
		return {
			pageTitle: 'Reader'
		}
	},
	head() {
		return {
			title: `${this.getGlasses()} ${this.pageTitle}`
		}
	},
	methods: {
		getGlasses: function() {
			if (this.$colorMode.unknown) {
				return '👓'
			}
			return this.$colorMode.value === 'light' ? '🕶' : '👓'
		}
	}
}
