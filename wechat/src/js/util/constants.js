//客户平台订单状态
export const CustomerOrderState = {
    //未付款
    Unpaid:'unpaid',
    //已付款
    Paid:'paid',
    //已签约
    Signed:'signed',
    //正常进行中
    Progressing:'progressing',
    //退款进行中
    Refunding:'refunding',
    //投诉进行中
    Complaints:'complaints',
    //正常已完成
    Completed:'completed',
    //退款已完成
    Refunded:'refunded',
    //投诉已完成
    ComplaintsOut:'complaints-out',
    //更换护工中
    SubstitutePending:'substitute-pending',
    //更换护工已接单
    Substituting:'substituting',
    //更换护工已经开始服务
    Substituted:'substituted',
    //已取消
    Cancelled:'cancelled'
}

//客户与平台订单状态字典
export const CustomerOrderStateDict = {
    [CustomerOrderState.Unpaid]:'未付款',
    [CustomerOrderState.Paid]:'已付款',
    [CustomerOrderState.Signed]:'已签约',
    [CustomerOrderState.Progressing]:'正常进行中',
    [CustomerOrderState.Refunding]:'结算中',
    [CustomerOrderState.Complaints]:'投诉进行中',
    [CustomerOrderState.Completed]:'正常已完成',
    [CustomerOrderState.Refunded]:'退款已完成',
    [CustomerOrderState.ComplaintsOut]:'投诉已完成',
    [CustomerOrderState.SubstitutePending]:'更换护工中',
    [CustomerOrderState.Substituting]:'护工已接单',
    [CustomerOrderState.Substituted]:'护工开始服务',
    [CustomerOrderState.Cancelled]:'已取消'
}

//客户与护工订单状态工作关系
//'idle','accept','reject'
export const CustInfoRetionShipStatus={
    Idle:'idle',
    Accept:'accept',
    Reject:'reject'
}
//客户与护工订单状态工作关系数据字典
export const CustInfoRetionShipStatusDict={
    [CustInfoRetionShipStatus.Idle]:'未接单',
    [CustInfoRetionShipStatus.Accept]:'接单',
    [CustInfoRetionShipStatus.Reject]:'拒单'
}

//客户端护理类型
export const CustInfoServiceTypeStatus={
    DependLeve1:'level1',
    DependLeve2:'level2',
    DependLeve3:'level3'
}

//客户端护理类型字典
export const CustInfoServiceTypeStatusDict={
    [CustInfoServiceTypeStatus.DependLeve1]:'非卧床',
    [CustInfoServiceTypeStatus.DependLeve2]:'卧床',
    [CustInfoServiceTypeStatus.DependLeve3]:'特殊'
}
