// 커스텀 로거입니다
export default function ({ app }, inject) {
  const log = function (caller, ...message) {
    console.log('콜러 is ', caller.prototype, '메시지 is ', ...message)
  }
  const log2 = log.bind(this)
  const logger = { log2 }
  inject('log', logger)
}
