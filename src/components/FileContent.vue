<template>
	<div class="filelist">
		<FileList ref="filelist"></FileList>
	</div>
</template>

<script>
// @ is an alias to /src

import FileList from '@/components/subcomponents/FileList.vue'

export default {
	components: {
		FileList
	},
}
</script>

