<script setup>
import { ref, onMounted } from 'vue'
import AdminPageWrapper from '../components/AdminPageWrapper.vue'
import axios from 'axios'

// متغیرها
const galleryImages = ref([]) // ذخیره تصاویر موجود
const newImage = ref('') // لینک تصویر جدید
const isLoading = ref(false) // وضعیت بارگذاری

// دریافت تصاویر گالری
const fetchGalleryImages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/gallery-home')
    galleryImages.value = response.data.images || []
  } catch (error) {
    console.error('Error fetching gallery images:', error)
  }
}

// افزودن تصویر جدید
const addImage = async () => {
  if (!newImage.value) return alert('لینک تصویر نمی‌تواند خالی باشد.')
  isLoading.value = true
  try {
    const response = await axios.post('http://localhost:8000/gallery', { image_url: newImage.value })
    if (response.data.success) {
      galleryImages.value.push({ image_url: newImage.value })
      newImage.value = ''
      alert('تصویر با موفقیت اضافه شد.')
      window.location.reload() // رفرش صفحه بعد از افزودن تصویر
    }
  } catch (error) {
    console.error('Error adding image:', error)
    alert('افزودن تصویر با خطا مواجه شد.')
  } finally {
    isLoading.value = false
  }
}

// حذف تصویر
const deleteImage = async (index, image) => {
  const confirmDelete = confirm('آیا مطمئن هستید که می‌خواهید این تصویر را حذف کنید؟')
  if (!confirmDelete) return
  isLoading.value = true
  window.location.reload() // رفرش صفحه بعد از افزودن تصویر
  try {
    const response = await axios.post('http://localhost:8000/gallery/delete', { id: image.id })
    if (response.data.success) {
      galleryImages.value.splice(index, 1) // حذف تصویر از لیست
      alert('تصویر با موفقیت حذف شد.')
      window.location.reload() // رفرش صفحه بعد از حذف تصویر
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    alert('حذف تصویر با خطا مواجه شد.')
  } finally {
    isLoading.value = false
  }
}

// بارگذاری داده‌ها هنگام mount شدن
onMounted(() => {
  fetchGalleryImages()
})
</script>

<template>
  <AdminPageWrapper page="galery">
    <div class="admin-panel">
      <h2>پنل مدیریت گالری تصاویر</h2>

      <!-- فرم افزودن تصویر -->
      <div class="form-group mb-4">
        <label for="image-url">لینک تصویر جدید:</label>
        <input
          v-model="newImage"
          id="image-url"
          type="text"
          class="form-control"
          placeholder="لینک تصویر را وارد کنید..."
        />
        <button class="btn btn-primary mt-2" @click="addImage" :disabled="isLoading">
          افزودن تصویر
        </button>
      </div>

      <!-- جدول نمایش تصاویر -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>تصویر</th>
            <th>لینک تصویر</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(image, index) in galleryImages" :key="index">
            <td>
              <img :src="image.image_url" alt="Gallery Image" class="img-thumbnail" style="width: 100px; height: 100px;" />
            </td>
            <td>{{ image.image_url }}</td>
            <td>
              <button class="btn btn-danger" @click="deleteImage(index, image)" :disabled="isLoading">
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminPageWrapper>
</template>

<style scoped>
.admin-panel {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group label {
  font-weight: bold;
}

.table {
  margin-top: 20px;
}
</style>
