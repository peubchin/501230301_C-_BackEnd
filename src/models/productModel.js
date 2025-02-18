import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  code: {
    type: String,
    required: [true, "Bat buoc phai nhap ma san pham"],
  },
  name: {
    type: String,
    required: [true, "Bat buoc phai nhap ten"],
  },
  price: {
    type: Number,
    required: [true, "Bat buoc phai nhap gia"],
  },
  searchString: {
    type: String,
    required: [true, "Bat buoc phai nhap chuoi tim kiem"],
  },
  sizes:{
    type: [String],
    enum:["S","M","L","XL"]
  },
  colors:{
    type:[String],
    enum:["red","green","yellow","white","black"]
  },
  active:String,

  description: {
    type:String,
    required:[true,"Bat buoc phai nhap mo ta"]
  },
  information: {
    type:String,
    required:[true,"Bat buoc phai nhap thong tin san pham"]
  },
  images: {
    type:[String],
    validate: {
      validator: (val) => {
        if (val.length == 1 && val[0].length == 0) {
          throw new Error('Bắt buộc nhập hình ảnh');
        }
        return true;
      },
      message: function (props) {
        return props.reason.message;
      },
    },
    required:[true,"Bat buoc phai nhap hinh anh"]
  },
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories' }, //
  deleteAt: Date,
}, {
  versionKey: false,
  collection: 'products',
  timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' },
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
productSchema.virtual("category",{
  ref: "category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true
})
productSchema.virtual('categoryIdString').get(function(){
  return !!this.categoryId ? this.categoryId.toString():"";
})
// // Tính thời gian tạo, category được tạo bao lâu
// productSchema.virtual('create').get(function(){
//   return new Date().getTime()- new Date(this.createAt).getTime();
// })
const productModel = mongoose.model('product', productSchema);
export default productModel;
