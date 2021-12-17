<template>
  <div>
    <div>Repositories</div>

    <el-button type="primary" size="mini" @click="onCreateDialog" :icon="CirclePlus">Add Repository</el-button>
    <el-dialog title="Create User" v-model="showCreatingDialog" width="80%"
               :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <repository-creation @action-result="onCreationResult"/>
    </el-dialog>

    <el-table :data="repositories" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="uri" label="URI" />
      <el-table-column prop="createTime" label="Create Time" />
      <el-table-column label="Action">
         <template #default="scope">
          <repository-delete :repository="scope.row" @action-result="onDeleteResult"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {  CirclePlus } from '@element-plus/icons-vue'
</script>


<script>
import { skysight } from '../../skysight'
import RepositoryCreation from './RepositoryCreation.vue'
import RepositoryDelete from './RepositoryDelete.vue'

export default {
  name: 'Repositories',
  components: {
    RepositoryCreation,
    RepositoryDelete
  },
  data () {
    return {
      repositories: null,
      showCreatingDialog: false
    }
  },
  mounted () {
    this.loadRepositories()
  },
  methods: {
    loadRepositories () {
      const mask = this.$loading({ lock: true, text: 'requesting', spinner: 'el-icon-loading', background: 'rgba(255,255,255,0.7)' })
      skysight.queryRepositories().then((resp) => {
        this.repositories = resp
      }).catch((error) => {
        this.$notify.error({ title: 'Error', message: 'failed to load data: ' + error })
      }).finally(() => {
        mask.close()
      })
    },
    onCreateDialog () {
      this.showCreatingDialog = true
    },
    onCreationResult (result) {
      this.showCreatingDialog = false
      if (result) {
        this.loadRepositories()
      }
    },
    onDeleteResult (result) {
      if (result) {
        this.loadRepositories()
      }
    }
  }
}
</script>

<style scoped>
</style>
