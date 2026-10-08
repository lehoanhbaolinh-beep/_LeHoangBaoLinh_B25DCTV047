const rules = {
  title: v => v.trim().length >= 3 ? "" : "Tên sách tối thiểu 3 ký tự",
  author: v => v.trim() ? "" : "Tác giả là bắt buộc",
  genre: v => v ? "" : "Vui lòng chọn thể loại",
  year: v => { const y = Number(v); return v && y >= 1900 && y <= new Date().getFullYear() ? "" : `Năm từ 1900 đến ${new Date().getFullYear()}`; },
};
export const validateField = (name, value) => rules[name](value);
