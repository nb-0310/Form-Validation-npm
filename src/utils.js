export const isValidFileFormat = (file, allowedFormats) => {
	const fileType = file && file.name && file.name.split('.').pop()

	return (
		fileType &&
		allowedFormats.some(
			(format) => format.toLowerCase() === fileType.toLowerCase()
		)
	)
}

export const isValidFileSize = (file, allowedSize) => {
	const fileSize = file && file.size

	return fileSize && allowedSize >= fileSize
}

export const formatFileSize = (bytes) => {
	if (bytes === 0) return '0 Bytes'

	const k = 1024
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
