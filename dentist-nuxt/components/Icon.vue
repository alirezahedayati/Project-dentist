<script setup lang="ts">
import { CalendarDays,Smile,Phone,MapPin,Instagram,Menu, X, ArrowLeft,ArrowRight,ChevronLeft,ChevronRight,
  ClipboardCheck,Stethoscope,Sparkles,ShieldCheck,Activity,Sun,Gem,HeartHandshake,Check,Clock,Shield,Star,
  CalendarCheck,Heart,UserRound,CheckCircle2,ChevronDown,MessageCircle,Search,Settings,LayoutDashboard,LogOut,
  Plus,Trash2,Pencil,CalendarOff,RefreshCcw,Mail,ArrowUpLeft,Send,Info,AlertCircle,LockKeyhole,Users,BookOpen,
  ClipboardList,CalendarClock,ArrowDownLeft, LoaderCircle, ExternalLink, Eye, Award, Circle } from 'lucide-vue-next'
const props=withDefaults(defineProps<{name:string;size?:number;strokeWidth?:number}>(),{size:20,strokeWidth:1.85})
const names: Record<string,any>={
 'calendar-days':CalendarDays,'smile':Smile,'phone':Phone,'map-pin':MapPin,'instagram':Instagram,'menu':Menu,'x':X,
 'arrow-left':ArrowLeft,'arrow-right':ArrowRight,'chevron-left':ChevronLeft,'chevron-right':ChevronRight,
 'clipboard-check':ClipboardCheck,'stethoscope':Stethoscope,'sparkles':Sparkles,'shield-check':ShieldCheck,
 'activity':Activity,'sun':Sun,'gem':Gem,'heart-handshake':HeartHandshake,'check':Check,'clock':Clock,
 'shield':Shield,'star':Star,'calendar-check':CalendarCheck,'heart':Heart,'user-round':UserRound,
 'check-circle-2':CheckCircle2,'chevron-down':ChevronDown,'message-circle':MessageCircle,'search':Search,
 'settings':Settings,'layout-dashboard':LayoutDashboard,'log-out':LogOut,'plus':Plus,'trash-2':Trash2,
 'pencil':Pencil,'calendar-off':CalendarOff,'refresh-ccw':RefreshCcw,'mail':Mail,'arrow-up-left':ArrowUpLeft,
 'send':Send,'info':Info,'alert-circle':AlertCircle,'lock-keyhole':LockKeyhole,'users':Users,
 'circle':Circle,'book-open':BookOpen,'clipboard-list':ClipboardList,'calendar-clock':CalendarClock,'arrow-down-left':ArrowDownLeft,
 'loader-circle':LoaderCircle,'external-link':ExternalLink,'eye':Eye,'award':Award
}
const component=computed(()=>names[props.name]||Sparkles)
</script>
<template><component :is="component" :size="size" :stroke-width="strokeWidth" aria-hidden="true" /></template>
