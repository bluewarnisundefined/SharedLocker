import { LockerStatus } from "@/types/api/locker"

export interface LockerStatusAttributes {
    status: LockerStatus,
    statusText: string,
    color: string,
    disabled: boolean
}

export const LockerStatusAttrMapper = (status: LockerStatus): LockerStatusAttributes => {
    const statusAttr: LockerStatusAttributes = {
        status: status,
        statusText: '',
        color: '',
        disabled: false
    }
    if(status === LockerStatus.Empty) {
        statusAttr.statusText = '비어 있음'
        statusAttr.color = '#329F5B'
    } else if(status === LockerStatus.Share_Available) {
        statusAttr.statusText = '공유 가능'
        statusAttr.color = '#3C91E6'
    } else if(status === LockerStatus.UnAvailable) {
        statusAttr.statusText = '사용 중'
        statusAttr.disabled = true
    } else if(status === LockerStatus.Maintenance) {
        statusAttr.statusText = '점검 중'
        statusAttr.disabled = true
    } else {
        statusAttr.statusText = '알 수 없음'
    }
    return statusAttr;
}

