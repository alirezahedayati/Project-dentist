<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const scrollToTopButton = ref(null);

const handleScroll = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        scrollToTopButton.value.style.display = 'block';
    } else {
        scrollToTopButton.value.style.display = 'none';
    }
}

const scrollToTop = () => {
    window.scrollTo(0, 0);
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
    <footer id="footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6">
                        <div class="footer-info">
                            <h3>لبخــــــند</h3>
                            <p>
                                ایران<br>
                                مشهد , نبش ابن سینا 21 , پلاک 11 , طبقه 2<br><br>
                                <strong>شماره تماس :</strong>09157101242 __ 05138441114<br>
                                <strong>ایمیل :</strong> alirezahed75@gmail.com<br>
                            </p>
                            <div class="social-links mt-3">
                                <RouterLink to="#" class="twitter"><i class="fa-brands fa-twitter"></i></RouterLink>
                                <RouterLink to="#" class="facebook"><i class="fa-brands fa-facebook"></i></RouterLink>
                                <RouterLink to="#" class="instagram"><i class="fa-brands fa-instagram"></i></RouterLink>
                                <RouterLink to="#" class="google-plus"><i class="fa-brands fa-skype"></i></RouterLink>
                                <RouterLink to="#" class="linkedin"><i class="fa-brands fa-linkedin"></i></RouterLink>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 footer-newsletter">
                        <h4>خبرنامه ما</h4>
                        <p>با این حال، اگر بسیاری از افراد هستند که نمی دانند من چه می خوانم، آنگاه عیب بزرگ خود را
                            خواهم خواند</p>
                        <form action="" method="post">
                            <input type="submit" value="عضویت"><input type="email" name="email">
                        </form>

                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="copyright">
                &copy;
                تمام حقوق و محتویات این سایت متعلق به <strong><span>دکتر آزاده مهرداد </span></strong>میباشد و هرگونه
                کپی برداری
                بدون ذکر منبع پیگرد قانونی دارد.
            </div>
            <div class="credits">

                طراحی شده توسط <RouterLink to="#">علیرضا هدایتی </RouterLink>
            </div>
        </div>
    </footer>


    <button id="scroll-to-top-button" @click="scrollToTop" ref="scrollToTopButton">
        <i class="fa-solid fa-arrow-up"></i>
    </button>

</template>

<style scoped>
#scroll-to-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    background-color: #65c9cd;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 20%;
    cursor: pointer;
}
</style>