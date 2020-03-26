export default ({ Schema }) =>
  new Schema(
    {
      title: {
        type: String,
        trim: true,
        required: [true, '标题不能为空']
      },
      body: {
        type: String,
        required: [true, '内容不能为空']
      },
      author: {
        type: Schema.Types.ObjectId,
        required: [true, '作者不能为空']
      },
      opts: [
        {
          optId: {
            type: Schema.Types.ObjectId
          },
          flag: {
            type: Boolean
          }
        }
      ]
    },
    {
      collection: 'articals',
      timestamps: true
    }
  )
