<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminPageWrapper from '../components/AdminPageWrapper.vue'
import { useAppointmentStore, useUserStore } from '../stores'

const router = useRouter()
const appointmentStore = useAppointmentStore()
const userStore = useUserStore()

onMounted(async () => {
  const user = await userStore.me()
  if (!user || user.is_admin !== 'true') {
    router.push({ path: '/', replace: true })
    return
  }
  await appointmentStore.fetchAppointments()
})
</script>

<template>
  <AdminPageWrapper page="appointments">
    <div class="container-fluid">

      <!-- Page Heading -->
      <h1 class="h3 mb-2 text-gray-800">نوبت ها</h1>

      <!-- DataTales Example -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">لیست نوبت های ثبت شده</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>شماره موبایل</th>
                  <th>نوع نوبت</th>
                  <th>تاریخ رزرو</th>
                  <th>هزینه معالجه</th>
                </tr>
              </thead>
              <!-- <tfoot>
                <tr>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>شماره موبایل</th>
                  <th>نوع نوبت</th>
                  <th>تاریخ رزرو</th>
                  <th>هزینه معالجه</th>
                </tr>
              </tfoot> -->
              <tbody>
                <tr v-for="appointment in appointmentStore.appointments">
                  <td>{{ appointment.first_name }}</td>
                  <td>{{ appointment.last_name }}</td>
                  <td>{{ appointment.mobile_number }}</td>
                  <td>{{ appointment.type === 'cosmetic' ? 'معاینه زیبایی' : 'معاینه عمومی' }}</td>
                  <td>{{ appointment.reserved_at }}</td>
                  <td>{{ ' - ' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminPageWrapper>
</template>

<style scoped></style>
