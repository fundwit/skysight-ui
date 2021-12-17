<template>
  <div>
    <el-form ref="form" :model="creation" label-width="200px">
      <el-form-item label="URI">
        <el-input v-model="creation.uri"></el-input>
      </el-form-item>
    </el-form>

    <el-divider style="margin: 0"/>
    <el-button type="primary" @click="onCreating">Submit</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </div>
</template>

<script>
import { skysight } from '../../skysight'

export default {
  name: 'RepositoryCreation',
  data () {
    return {
      creation: {
        uri: ''
      },
      actionResult: null
    }
  },
  methods: {
    onCancel () {
      this.$emit('action-result', null)
    },
    onCreating () {
      if (!this.creation || !this.creation.uri) {
        this.$notify.error({ title: 'Error', message: '参数错误' })
        return
      }

      const mask = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(255,255,255,0.7)' })
      skysight.createRepository({
        uri: this.creation.uri,
      }).then((resp) => {
        this.actionResult = resp
        this.creation.uri = ''
        this.$emit('action-result', this.actionResult)
      }).catch((error) => {
        this.$notify.error({ title: 'Error', message: error })
      }).finally(() => {
        mask.close()
      })
    }
  }
}
</script>

<style scoped>
</style>