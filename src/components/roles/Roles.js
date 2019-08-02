export default {
  /* eslint-disable */
  created() {
    this.loadRolesData()
    this.loadRightsData()
  },

  data() {
    return {
      rolesData: [
        {
          roleName: '王小虎',
          roleDesc: '上海市普陀'
        }
      ],
      roleId: 0,
      dialogAssignRightsVisible: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index
    },
    async loadRolesData() {
      let res = await this.$axios.get('roles')
      this.rolesData = res.data.data
    },
    async loadRightsData() {
      let res = await this.$axios.get('rights/tree')
      this.treeData = res.data.data
    },
    showAssignRightsDialog(row) {
      this.dialogAssignRightsVisible = true
      let keys = []
      this.roleId = row.id
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    async assignRights() {
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let key = [...keys1, ...keys2]

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: key.join(',')
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: '授权成功',
          type: 'success',
          duration: 800
        })
        this.dialogAssignRightsVisible = false
        this.loadRolesData()
      }
    }
  }
}
