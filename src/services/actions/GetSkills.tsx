// import React from "react";
// import getEnvVariable from "@/utils/getEnvVariable";
// import SkillsList from "@/components/UI/HomePage/Opportunity/SkillsList";
// const GetSkills = async () => {
//   const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
//   const result = await fetch(`${url}/skills`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // next: {revalidate: 1296000},
//   });
//   const skillsArr = await result.json();
//   return (
//     <div>
//       <SkillsList skillsArr={skillsArr.data} />
//     </div>
//   );
// };

// export default GetSkills;
