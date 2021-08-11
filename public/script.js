const dateele=document.getElementById('fldati');

const now=new Date();
const day=function()
{
  
  let dy=now.getDay();
  const day_arr=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  return day_arr[dy];
}
const monthdate=function()
{
  const montharr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const date=now.getDate();
  return `${montharr[now.getMonth()]} ${date}`;
}
const time=function()
{
   let tm=now.getHours();
   const min=now.getMinutes();
   let period="AM";
   if(tm>11)
    period="PM";
    if(tm>12)
     tm-=12;

    return `${tm}:${min} ${period}`;
}

dateele.innerHTML=day()+" | "+monthdate()+" | "+time();