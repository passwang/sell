<template>
<div class="star" :class="starType">
  <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
</div>
</template>
<script type="text/javascript">
const starOn = 'on';
const starHalf = 'half';
const starOff = 'off';
const Length = 5;
export default {
	props: {
  size: {
  type: Number
  },
  score: {
  type: Number
  }
  },
  computed: {
  starType() {
  return 'star-' + this.size;
  },
  itemClasses() {
  let result = [];
  let score = Math.floor(this.score * 2) / 2;
  let hasDecimal = score % 1 !== 0;
  let integer = Math.floor(score);
  for (let i = 0; i < integer; i++) {
      result.push(starOn);
  }
  if (hasDecimal) {
      result.push(starHalf);
  }
  while (result.length < Length) {
      result.push(starOff);
  }
  return result;
  }
  }

};
</script>
<style>
.star{
  font-size: 0;
 }
 .star .star-item{
  display: inline-block;
  background-repeat: no-repeat;
 }
 .star .star-item:last-child{
    margin-right: 0;
 }
 .star.star-48 .star-item{
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
 }
 .star.star-48 .star-item.on{
  background-image: url('../../../resource/img/star48_on@2x.png');
 }
 .star.star-48 .star-item.half{
    background-image: url('../../../resource/img/star48_half@2x.png');
 }
 .star.star-48 .star-item.off{
    background-image: url('../../../resource/img/star48_off@2x.png');
 }

 .star.star-36 .star-item{
  width: 15px;
  height: 15px;
  margin-right: 16px;
  background-size: 15px 15px;
 }
 .star.star-36 .star-item.on{
  background-image: url('../../../resource/img/star36_on@2x.png');
 }
 .star.star-36 .star-item.half{
    background-image: url('../../../resource/img/star36_half@2x.png');
 }
  .star.star-36 .star-item.off{
    background-image: url('../../../resource/img/star36_off@2x.png');
 }
 .star.star-24 .star-item{
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
 }
 .star.star-24 .star-item.on{
  background-image: url('../../../resource/img/star24_on@2x.png');
 }
 .star.star-24 .star-item.half{
    background-image: url('../../../resource/img/star24_half@2x.png');
 }
  .star.star-24 .star-item.off{
    background-image: url('../../../resource/img/star24_off@2x.png');
 }
</style>

