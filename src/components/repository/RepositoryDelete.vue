<template>
  <el-button type="danger" size="mini" :icon="Delete" @click="onDeleteConfirm">Delete</el-button>
</template>

<script setup>
import {  Delete } from '@element-plus/icons-vue'
</script>

<script>
import { skysight } from '../../skysight'

export default {
  name: 'RepositoryDelete',
  props: {
    repository: null
  },
  methods: {
    onDeleteConfirm () {
      const deleteOutput = {}
      this.$prompt(`repository "${this.repository.uri}" will be deleted. deletion action is unrecoverable, input "DELETE" to confirm.`, 'Delete Confirm', {
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        inputPattern: /DELETE/,
        inputErrorMessage: 'invalid input'
      }).then(() => {
        return skysight.deleteRepository(this.repository.id).then(resp => {
          this.$message({ type: 'success', message: 'delete success' })
          deleteOutput.result = true
        }).catch(err => {
          this.$message({ type: 'error', message: 'delete failed: ' + err })
        })
      }).catch(() => {
      }).finally(() => {
        if (deleteOutput.result) {
          this.$emit('action-result', this.repository)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
