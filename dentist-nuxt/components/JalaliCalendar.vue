<script setup lang="ts">
import { toJalaali,toGregorian,jalaaliMonthLength } from 'jalaali-js'
const props=withDefaults(defineProps<{modelValue?:string;timezone?:string;horizon?:number;allowPast?:boolean;blockedDates?:string[];workingHours?:Record<string,string[][]>}>(),{timezone:'Asia/Tehran',horizon:60,allowPast:false})
const emit=defineEmits<{ 'update:modelValue':[value:string] }>()
const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
const weekdays=['ش','ی','د','س','چ','پ','ج']
function todayIso(){
  const p=new Intl.DateTimeFormat('en-US',{timeZone:props.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date())
  const get=(type:string)=>p.find(x=>x.type===type)?.value||''
  return `${get('year')}-${get('month')}-${get('day')}`
}
const today=computed(()=>todayIso())
const todayJ=computed(()=>{const [gy,gm,gd]=today.value.split('-').map(Number);return toJalaali(gy,gm,gd)})
const jy=ref(todayJ.value.jy),jm=ref(todayJ.value.jm)
const displayYear=computed(()=>jy.value.toLocaleString('fa-IR'))
const days=computed(()=>{
  const first=toGregorian(jy.value,jm.value,1)
  const offset=(new Date(Date.UTC(first.gy,first.gm-1,first.gd)).getUTCDay()+1)%7
  const count=jalaaliMonthLength(jy.value,jm.value)
  return [...Array(offset).fill(null),...Array.from({length:count},(_,i)=>{
    const g=toGregorian(jy.value,jm.value,i+1)
    const date=`${g.gy}-${String(g.gm).padStart(2,'0')}-${String(g.gd).padStart(2,'0')}`
    const delta=Math.round((Date.parse(`${date}T12:00:00Z`)-Date.parse(`${today.value}T12:00:00Z`))/86400000)
    const weekday=new Date(Date.UTC(g.gy,g.gm-1,g.gd)).getUTCDay()
    const closed=!!props.workingHours && !(props.workingHours[String(weekday)]?.length)
    return { day:i+1,date,disabled:(!props.allowPast&&delta<0)||delta>props.horizon||!!props.blockedDates?.includes(date)||closed }
  })]
})
const canPrevious=computed(()=>props.allowPast || jy.value>todayJ.value.jy || (jy.value===todayJ.value.jy && jm.value>todayJ.value.jm))
function navigate(direction:number){if(direction<0&&!canPrevious.value)return;const newMonth=jm.value+direction;if(newMonth<1){jm.value=12;jy.value--}else if(newMonth>12){jm.value=1;jy.value++}else jm.value=newMonth}
function choose(item:{date:string;disabled:boolean}){if(!item.disabled)emit('update:modelValue',item.date)}
</script>
<template>
  <div class="rounded-2xl border border-[#e2ece5] p-4 sm:p-5 bg-white">
    <div class="flex justify-between items-center mb-5 px-1"><button type="button" class="p-2 hover:bg-jade-50 rounded-lg" :disabled="!canPrevious" :class="!canPrevious?'opacity-25':''" aria-label="ماه قبل" @click="navigate(-1)"><Icon name="chevron-right" :size="19" /></button><strong class="text-jade-800 text-[14px]">{{months[jm-1]}} {{displayYear}}</strong><button type="button" class="p-2 hover:bg-jade-50 rounded-lg" aria-label="ماه بعد" @click="navigate(1)"><Icon name="chevron-left" :size="19" /></button></div>
    <div class="grid grid-cols-7 gap-1 mb-3"><span v-for="w in weekdays" :key="w" class="text-center text-[12px] font-bold text-[#a1b2a9]">{{w}}</span></div>
    <div class="grid grid-cols-7 gap-1"><div v-for="(day,i) in days" :key="i"><button v-if="day" type="button" :disabled="day.disabled" class="aspect-square w-full rounded-xl text-[12px] font-semibold transition-colors" :class="day.disabled?'text-[#d2ddd5] cursor-not-allowed':day.date===modelValue?'text-white bg-jade-700 shadow-md':'text-[#3e6357] hover:bg-[#eaf5ed]'" @click="choose(day)">{{Number(day.day).toLocaleString('fa-IR')}}</button></div></div>
    <p class="text-center text-[10px] text-[#9aae9e] mt-4">روزهای کم‌رنگ قابل رزرو نیستند.</p>
  </div>
</template>
