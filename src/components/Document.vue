<template>
	<div class="filelist">
		<FileType :path="'filetype.php?type=doc'"></FileType>
	</div>
</template>

<script>
// @ is an alias to /src

import FileType from '@/components/subcomponents/FileType.vue'

export default {
	components: {
		FileType
	}
}
</script>
