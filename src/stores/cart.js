import { ref,computed } from "vue";
import { defineStore } from "pinia";
import { cartItems } from "@/mockData";

//购物车的全局状态（Pinia store）
//把购物车数据从组件里抽出来放入store，这样购物车页和底部导航栏的角标能共享数据
    export const useCartstore = defineStore("cart",()=>{
        const items =ref(cartItems.map((item)=>({...item})))

        //商品总件数（顶部导航栏的红色角标用它）
        const totalCount = computed(() =>
            items.value.reduce((sum,item) => sum + item.quantity,0)
        )
            // 是否全部选中（用于全选框双向绑定）
    const isAllChecked = computed({
        get() {
        // 无商品时默认不选中
        if (items.value.length === 0) return false;
        // 所有商品checked都为true才返回true
        return items.value.every((item) => item.checked);
        },
        set(val) {
        // 修改全选状态，同步所有商品勾选
        items.value.forEach((item) => {
            item.checked = val;
        });
        },
    });
        const totalPrice = computed(()=>
        items.value
        .filter((item)=>item.checked)
        .reduce((sum,item) => sum + Number(item.price) * item.quantity,0)
        )
        // 一键清空购物车
        const clearAllCart = () => {
            items.value = [];
    };
        // 反选功能：选中变取消，取消变选中
        const reverseCheck = () => {
            items.value.forEach((item) => {
            item.checked = !item.checked;
        });
    };
        const removeItem = (id)=>{
            items.value = items.value.filter((item) => item.id !== id)
        }
        
        const addToCart = (product,specName)=>{
            const exist = items.value.find((item)=>item.id===product.id)
            if(exist){
                exist.quantity += 1
            }else{
                items.value.push({
                    id:product.id,
                    name:specName || product.name,
                    image:product.image,
                    price:product.price,
                    quantity:1,
                    checked:true,
                })
            }
        }
        return{items,totalCount,totalPrice,removeItem,clearAllCart,reverseCheck,isAllChecked,addToCart}
    })