export default {
  name: 'users',
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: 'tiger@163.com',
          mobile: '1233211234567'
        }
      ],
      total: 0,
      pagenum: 1,
      input3: '',
      // 添加
      dialogAddFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑
      dialogEditFormVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色
      dialogAssignRoleVisible: false,
      assignRoleForm: {
        username: 'lay',
        id: '',
        rid: ''
      },
      rolesList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    // 获取数据
    getUserData (pagenum = 1, query = '') {
      this.$axios
        .get('users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          }
        })
        .then(res => {
          // console.log(res)
          this.userData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    // 页数改变
    currentChange (currentPage) {
      this.getUserData(currentPage, this.input3)
    },
    // 搜索
    search () {
      this.getUserData(1, this.input3)
    },
    // 显示添加框
    showAddUsers () {
      this.dialogAddFormVisible = true
    },
    // 清空添加框
    addFormClear () {
      this.$refs.addUserRef.resetFields()
    },
    // 添加用户
    addUsers () {
      this.$axios.post('users', this.addForm).then(res => {
        if (res.data.meta.status === 201) {
          this.dialogAddFormVisible = false
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
        }
        this.getUserData(1)
      })
    },
    // 改变状态
    /* eslint-disable */
    changeState(row) {
      let { id, mg_state } = row
      this.$axios.put(`users/${id}/state/${mg_state}`).then(res => {
        if (res.data.meta.status === 200) {
          // 1. 提示
          this.$message({
            message: '更新状态成功',
            type: 'success',
            duration: 800
          })
        }
      })
    },
    //删除用户
    delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.delete(`users/${id}`).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 800
              })
              this.getUserData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 800
          })
        })
    },
    // 显示编辑模态框
    showEditUser(row) {
      let { id, username, mobile, email } = row
      this.$axios.get(`users/${id}`).then(res => {
        this.dialogEditFormVisible = true
        this.editForm = res.data.data
      })
    },
    // 编辑用户
    editUser() {
      let { id, mobile, email } = this.editForm
      this.$axios.put(`users/${id}`, { mobile, email }).then(res => {
        if (res.data.meta.status === 200) {
          this.dialogEditFormVisible = false
          this.$message({
            type: 'success',
            message: '更新状态成功!',
            duration: 800
          })
          this.getUserData(this.pagenum)
        }
      })
    },
    // 分配角色

    showAssignRoleForm(row) {
      this.$axios.get('roles').then(res => {
        // console.log(res)
        this.rolesList = res.data.data
      })
      const { id } = row
      // this.$axios.get(`users/${id}`).then(res => {
      //   // console.log(res)
      //   this.assignRoleForm = res.data.data
      //   var rid = res.data.data.rid
      //   // console.log(rid)
      //   this.$axios.put(`users/${id}/role`, { rid }).then(res => {
      //     console.log(res);

      //   })
      // })
      this.dialogAssignRoleVisible = true
      // this.$axios.
    }
  }
}
