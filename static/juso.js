// import axios from '@/plugins/axios'
//
// function getAddr(form) {
//   // 적용예 (api 호출 전에 검색어 체크)
//   if (!checkSearchedWord(form.keyword)) {
//     return
//   }
//
//   axios
//     .post('https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do', form)
//     .then((jsonStr) => {
//       const errCode = jsonStr.results.common.errorCode
//       const errDesc = jsonStr.results.common.errorMessage
//       if (errCode !== '0') {
//         alert(errCode + '=' + errDesc)
//       } else if (jsonStr != null) {
//         // makeListJson(jsonStr)
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//
//   // $.ajax({
//   //   url: 'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do', // 인터넷망
//   //   type: 'post',
//   //   data: $('#form').serialize(),
//   //   dataType: 'jsonp',
//   //   crossDomain: true,
//   //   success(jsonStr) {},
//   //   error(xhr, status, error) {
//   //     alert('에러발생')
//   //   },
//   // })
// }
//
// // function makeListJson(jsonStr) {
// //   let htmlStr = ''
// //   htmlStr += '<table>'
// //   $(jsonStr.results.juso).each(function () {
// //     htmlStr += '<tr>'
// //     htmlStr += '<td>' + this.roadAddr + '</td>'
// //     htmlStr += '<td>' + this.roadAddrPart1 + '</td>'
// //     htmlStr += '<td>' + this.roadAddrPart2 + '</td>'
// //     htmlStr += '<td>' + this.jibunAddr + '</td>'
// //     htmlStr += '<td>' + this.engAddr + '</td>'
// //     htmlStr += '<td>' + this.zipNo + '</td>'
// //     htmlStr += '<td>' + this.admCd + '</td>'
// //     htmlStr += '<td>' + this.rnMgtSn + '</td>'
// //     htmlStr += '<td>' + this.bdMgtSn + '</td>'
// //     htmlStr += '<td>' + this.detBdNmList + '</td>'
// //     /** API 서비스 제공항목 확대 (2017.02) **/
// //     htmlStr += '<td>' + this.bdNm + '</td>'
// //     htmlStr += '<td>' + this.bdKdcd + '</td>'
// //     htmlStr += '<td>' + this.siNm + '</td>'
// //     htmlStr += '<td>' + this.sggNm + '</td>'
// //     htmlStr += '<td>' + this.emdNm + '</td>'
// //     htmlStr += '<td>' + this.liNm + '</td>'
// //     htmlStr += '<td>' + this.rn + '</td>'
// //     htmlStr += '<td>' + this.udrtYn + '</td>'
// //     htmlStr += '<td>' + this.buldMnnm + '</td>'
// //     htmlStr += '<td>' + this.buldSlno + '</td>'
// //     htmlStr += '<td>' + this.mtYn + '</td>'
// //     htmlStr += '<td>' + this.lnbrMnnm + '</td>'
// //     htmlStr += '<td>' + this.lnbrSlno + '</td>'
// //     htmlStr += '<td>' + this.emdNo + '</td>'
// //     /** API 서비스 제공항목 확대 (2020.12) **/
// //     htmlStr += '<td>' + this.hstryYn + '</td>'
// //     htmlStr += '<td>' + this.relJibun + '</td>'
// //     htmlStr += '<td>' + this.hemdNm + '</td>'
// //     htmlStr += '</tr>'
// //   })
// //   htmlStr += '</table>'
// //   $('#list').html(htmlStr)
// // }
//
// // 특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
// function checkSearchedWord(obj) {
//   if (obj.value.length > 0) {
//     // 특수문자 제거
//     const expText = /[%=><]/
//     if (expText.test(obj.value) === true) {
//       alert('특수문자를 입력 할수 없습니다.')
//       obj.value = obj.value.split(expText).join('')
//       return false
//     }
//
//     // 특정문자열(sql예약어의 앞뒤공백포함) 제거
//     const sqlArray = [
//       // sql 예약어
//       'OR',
//       'SELECT',
//       'INSERT',
//       'DELETE',
//       'UPDATE',
//       'CREATE',
//       'DROP',
//       'EXEC',
//       'UNION',
//       'FETCH',
//       'DECLARE',
//       'TRUNCATE',
//     ]
//
//     let regex
//     for (let i = 0; i < sqlArray.length; i++) {
//       regex = new RegExp(sqlArray[i], 'gi')
//
//       if (regex.test(obj.value)) {
//         alert('"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.')
//         obj.value = obj.value.replace(regex, '')
//         return false
//       }
//     }
//   }
//   return true
// }
//
// export default getAddr()
