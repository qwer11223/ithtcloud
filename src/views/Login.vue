<template>
	<form>
		<input type="text" v-model="user" />
		<input type="password" v-model="pwd" />
		<button @click="submit">登录</button>
		<button @click="check">验证</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			user: '',
			pwd: ''
		}
	},
	methods: {
		submit() {
			if (this.user == '' || this.pwd == '') return false
			var params = new URLSearchParams()
			params.append('user', this.user)
			params.append('pwd', this.pwd)
			this.$axios.post('cloud_server/jwt.php', params).then(res => {
				if (res.data == 403) return false
				localStorage.setItem('token', res.headers.authorization)
				this.$router.push('/')
			})
		},
		check() {
			this.$axios({
				methods: 'POST',
				url: 'cloud_server/jwt.php',
				headers: {
					TOKEN: localStorage.getItem('token')
				}
			}).then(res => {
				console.log(res)
			})
		}
	}
}
</script>

<style>
</style>