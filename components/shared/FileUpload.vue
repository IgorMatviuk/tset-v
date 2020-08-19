<template>
  <div class="file-upload">
    <div class="file-upload__wrapper">
      <label :for="name" class="file-upload__label">
        <template v-if="uploadedFilename">
          <span class="file-upload__filename">{{ uploadedFilename }}</span>
        </template>
        <template v-else>
          <svg-icon
            name="clip"
            width="15"
            height="15"
            class="file-upload__icon"
          />
          <span>{{ label }}</span>
        </template>
      </label>
      <div
        v-if="uploadedFilename"
        class="file-upload__btn-remove"
        @click="removeFile"
      >
        <svg-icon
          name="remove"
          width="15"
          height="15"
          class="file-upload__icon"
        />
      </div>
      <input
        :id="name"
        ref="fileInput"
        :name="name"
        type="file"
        @change="onFileUpload"
      />
    </div>
    <div v-if="isInvalidExtension" class="error-message">
      {{ $t('form.errors.file.extension') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    extensions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      uploadedFilename: null,
      isInvalidExtension: false
    }
  },
  computed: {
    extensionsString() {
      return this.extensions.map((ext) => `.${ext}`).join(', ')
    }
  },
  methods: {
    onFileUpload(event) {
      const file = event.target.files[0]
      const filename = file.name
      const [, ext] = filename.match(/.([^.]+)$/)

      if (this.extensions.includes(ext)) {
        if (this.isInvalidExtension) {
          this.isInvalidExtension = false
        }

        this.uploadedFilename = filename
        this.$emit('upload', { name: this.name, file })
      } else {
        this.isInvalidExtension = true
      }
    },
    removeFile() {
      this.uploadedFilename = null
      this.$refs.fileInput.value = null
      this.$emit('remove', this.name)
    }
  }
}
</script>

<style lang="scss">
.file-upload {
  position: relative;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    display: block;
    flex-shrink: 0;
    margin-right: 8px;
    color: $primary;
  }

  &__label {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    font-size: 13px;
    line-height: 16px;
    text-decoration-line: underline;
    color: $gray-dark-2;
    cursor: pointer;
  }

  &__filename {
    display: block;
    max-width: 215px;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__btn-remove {
    cursor: pointer;
  }

  input[type='file'] {
    display: none;
  }
}
</style>
