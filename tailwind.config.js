const c = (v) => `rgb(var(--${v}) / <alpha-value>)`;
module.exports={content:["./app/**/*.js","./components/**/*.js"],theme:{extend:{colors:{ink:c("ink"),panel:c("panel"),gold:c("gold"),pearl:c("pearl")},
fontFamily:{display:["var(--font-display)","Georgia","serif"],body:["var(--font-body)","Georgia","serif"]}}}}
