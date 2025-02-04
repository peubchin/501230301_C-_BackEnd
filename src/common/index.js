export function removeVietNamAccents(str){
  return str
  .normalize('NFD')//chuan hoa ve dang to hop
  .replace(/[\u0300-\u036f]/g,'')//loai bo cac dau to hop
  .replace(/đ/g,'d')
  .replace(/Đ/g,'D')

}