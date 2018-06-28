import Vue from 'vue'
import Router from 'vue-router'
import customer from '@/customer/Index'
import Worker from '@/worker/Index'
import supervisor from '@/supervisor/Index'
import Index from '@/index/app'
Vue.use(Router)
export default new Router({
	//mode: 'history',
	routes: [{
		path: "/customer",
		component: customer,
		children: [{
			path: '/customer/me',
			name: '用户首页',
			component: resolve => require(['@/customer/user/Me'], resolve)
		}, {
			path: '/customer/registration',
			name: '注册',
			component: resolve => require(['@/customer/user/registration'], resolve)
		}, {
			path: '/customer/info',
			name: '基本信息',
			component: resolve => require(['@/customer/user/Info'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/thewallet',
			name: '钱包',
			component: resolve => require(['@/customer/user/TheWallet'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/config',
			name: '设置',
			component: resolve => require(['@/customer/user/Config'], resolve)
		}, {
			path: '/customer/payRecharge',
			name: '充值',
			component: resolve => require(['@/customer/pay/Recharge'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/payBankCard',
			name: '银行卡',
			component: resolve => require(['@/customer/pay/BankCard'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/AddBankCard',
			name: '添加银行卡',
			component: resolve => require(['@/customer/pay/AddBankCard'], resolve)
		}, {
			path: '/customer/payBills',
			name: '帐单',
			component: resolve => require(['@/customer/pay/Bills'], resolve)
		}, {
			path: '/customer/payCashWithdrawal',
			name: '提现',
			component: resolve => require(['@/customer/pay/CashWithdrawal'], resolve)
		}, {
			path: '/customer/coupons',
			name: '优惠券',
			component: resolve => require(['@/customer/user/Coupons'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/about',
			name: '关于我们',
			component: resolve => require(['@/customer/user/About'], resolve)
		}, {
			path: '/customer/service',
			name: '服务条款',
			component: resolve => require(['@/customer/user/Service'], resolve)
		}, {
			path: '/customer/complaints',
			name: '投诉建议',
			component: resolve => require(['@/customer/user/Complaints'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/sharing',
			name: '分享',
			component: resolve => require(['@/customer/user/Sharing'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/collect',
			name: '收藏',
			component: resolve => require(['@/customer/user/Collect'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/hospital',
			name: '查找医院',
			component: resolve => require(['@/customer/health/Hospital'], resolve)
		}, {
			path: '/customer/hospitalWizard',
			name: '医院向导',
			component: resolve => require(['@/customer/health/HospitalWizard'], resolve)
		}, {
			path: '/customer/health',
			name: '护工之家健康资源',
			component: resolve => require(['@/customer/health/Index'], resolve)
		}, {
			path: '/customer/healthConsultation',
			name: '全球化顶级医疗服务内容',
			component: resolve => require(['@/customer/health/consultation/Index'], resolve)
		}, {
			path: '/customer/healthConsultationList',
			name: '资讯',
			component: resolve => require(['@/customer/health/consultation/List'], resolve)
		}, {
			path: '/customer/healthConsultationDetails',
			name: '资讯详情',
			component: resolve => require(['@/customer/health/consultation/Details'], resolve)
		}, {
			path: '/customer/order',
			name: '订单',
			component: resolve => require(['@/customer/order/List'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/orderdetails',
			name: '订单详情',
			component: resolve => require(['@/customer/order/Details'], resolve),
			meta: {
				title: '基本信息',
				requireAuth: true,
			}
		}, {
			path: '/customer/history',
			name: '历史服务',
			component: resolve => require(['@/customer/order/history'], resolve)
		}, {
			path: '/customer/workers',
			name: '找护工',
			component: resolve => require(['@/customer/workers/Index'], resolve)
		}, {
			path: '/customer/workersList',
			name: '护工信息',
			component: resolve => require(['@/customer/workers/List'], resolve)
		}, {
			path: '/customer/workersDetails',
			name: '护工',
			component: resolve => require(['@/customer/workers/Details'], resolve)
		}, {
			path: '/customer/Servicedescription',
			name: '服务说明',
			component: resolve => require(['@/customer/workers/Servicedescription'], resolve)
		}, {
			path: '/customer/agreement',
			name: '用户协议',
			component: resolve => require(['@/customer/user/Agreement'], resolve)
		}, {
			path: '/customer/paysuccess',
			name: '支付成功',
			component: resolve => require(['@/customer/order/PaySuccess'], resolve)
		}]
	}, {
		path: "/worker",
		component: Worker,
		children: [{
			path: '/',
			name: '护工首页',
			component: resolve => require(['@/worker/workers/Index'], resolve)
		}, {
			path: '/worker/Me',
			name: '护工健康资源',
			component: resolve => require(['@/worker/user/Me'], resolve)
		}, {
			path: '/worker/registration',
			name: '护工注册',
			component: resolve => require(['@/worker/user/registration'], resolve)
		}, {
			path: '/worker/attestation',
			name: '护工认证',
			component: resolve => require(['@/worker/user/Attestation'], resolve)
		}, {
			path: '/worker/info',
			name: '护工基本信息',
			component: resolve => require(['@/worker/user/Info'], resolve)
		}, {
			path: '/worker/seniorInfo',
			name: '护工高级信息',
			component: resolve => require(['@/worker/user/SeniorInfo'], resolve)
		}, {
			path: '/worker/thewallet',
			name: '护工钱包',
			component: resolve => require(['@/worker/user/TheWallet'], resolve)
		}, {
			path: '/worker/payRecharge',
			name: '护工充值',
			component: resolve => require(['@/worker/pay/Recharge'], resolve)
		}, {
			path: '/worker/payBankCard',
			name: '护工银行卡',
			component: resolve => require(['@/worker/pay/BankCard'], resolve)
		}, {
			path: '/worker/AddBankCard',
			name: '护工添加银行卡',
			component: resolve => require(['@/worker/pay/AddBankCard'], resolve)
		}, {
			path: '/worker/payBills',
			name: '护工帐单',
			component: resolve => require(['@/worker/pay/Bills'], resolve)
		}, {
			path: '/worker/payCashWithdrawal',
			name: '护工提现',
			component: resolve => require(['@/worker/pay/CashWithdrawal'], resolve)
		}, {
			path: '/worker/coupons',
			name: '护工优惠券',
			component: resolve => require(['@/worker/user/Coupons'], resolve)
		}, {
			path: '/worker/about',
			name: '护工关于我们',
			component: resolve => require(['@/worker/user/About'], resolve)
		}, {
			path: '/worker/service',
			name: '护工服务条款',
			component: resolve => require(['@/worker/user/Service'], resolve)
		}, {
			path: '/worker/complaints',
			name: '护工投诉建议',
			component: resolve => require(['@/worker/user/Complaints'], resolve)
		}, {
			path: '/worker/sharing',
			name: '护工分享',
			component: resolve => require(['@/worker/user/Sharing'], resolve)
		}, {
			path: '/worker/collect',
			name: '护工收款码',
			component: resolve => require(['@/worker/user/Collect'], resolve)
		}, {
			path: '/worker/hospital',
			name: '护工查找医院',
			component: resolve => require(['@/worker/health/Hospital'], resolve)
		}, {
			path: '/worker/hospitalWizard',
			name: '护工医院向导',
			component: resolve => require(['@/worker/health/HospitalWizard'], resolve)
		}, {
			path: '/worker/health',
			name: '护工之家',
			component: resolve => require(['@/worker/health/Index'], resolve)
		}, {
			path: '/worker/healthConsultation',
			name: '护工远程医疗',
			component: resolve => require(['@/worker/health/consultation/Index'], resolve)
		}, {
			path: '/worker/healthConsultationList',
			name: '护工资讯',
			component: resolve => require(['@/worker/health/consultation/List'], resolve)
		}, {
			path: '/worker/healthConsultationDetails',
			name: '护工资讯详情',
			component: resolve => require(['@/worker/health/consultation/Details'], resolve)
		}, {
			path: '/worker/order',
			name: '护工订单',
			meta: {
				template: '1',
			},
			component: resolve => require(['@/worker/order/List'], resolve)
		}, {
			path: '/worker/order2',
			name: '护工订单',
			meta: {
				template: '2',
			},
			component: resolve => require(['@/worker/order/List'], resolve)
		}, {
			path: '/worker/order3',
			name: '护工订单',
			meta: {
				template: '3',
			},
			component: resolve => require(['@/worker/order/List'], resolve)
		}, {
			path: '/worker/orderdetails',
			name: '护工订单详情',
			component: resolve => require(['@/worker/order/Details'], resolve)
		}, {
			path: '/worker/workers',
			name: '护工找护工',
			component: resolve => require(['@/worker/workers/Index'], resolve)
		}, {
			path: '/worker/workersDetails',
			name: '订单详情',
			component: resolve => require(['@/worker/workers/Details'], resolve)
		}, {
			path: '/worker/totals',
			name: '接单设置',
			component: resolve => require(['@/worker/order/Totals'], resolve)
		}, {
			path: '/worker/agreement',
			name: '护工协议',
			component: resolve => require(['@/worker/user/Agreement'], resolve)
		}, {
			path: '/worker/supervise',
			name: '督导管理',
			component: resolve => require(['@/worker/workers/supervise'], resolve)
		}, {
			path: '/order/dispatch',
			name: '派单',
			component: resolve => require(['@/worker/order/dispatch'], resolve)
		}, {
			path: '/worker/notice',
			name: '公告',
			component: resolve => require(['@/worker/workers/notice'], resolve)
		}, {
			path: '/worker/appeal',
			name: '投诉处理',
			component: resolve => require(['@/worker/workers/appeal'], resolve)
		},
		{
			path: "*",
			redirect: '/worker/me'
		}]
	}, {
		path: "/supervisor",
		component: supervisor,
		children: [{
			path: '/supervisor/index',
			name: '督工首页',
			component: resolve => require(['@/supervisor/workers/Index'], resolve)
		},{
			path: '/supervisor/order/list',
			name: '订单列表',
			component: resolve => require(['@/supervisor/order/List'], resolve)
		},{
			path: '/supervisor/details',
			name: '订单详情',
			component: resolve => require(['@/supervisor/order/details'], resolve)
		},],
	}, {
		path: "/website",
		component: Index,
		children: [{
			path: '/website/index',
			name: '用户首页',
			component: resolve => require(['@/index/index'], resolve)
		}, {
			path: '/website/healthInfo',
			name: '健康资源',
			component: resolve => require(['@/index/healthInfo'], resolve)
		}, {
			path: '/website/infoList',
			name: '资讯列表',
			component: resolve => require(['@/index/infoList'], resolve)
		}, {
			path: '/website/aboutUs',
			name: '关于我们',
			component: resolve => require(['@/index/aboutUs'], resolve)
		}, {
			path: '/website/Detail',
			name: '关于我们',
			component: resolve => require(['@/index/common/infoDetail'], resolve)
		}]
	}
	]
})