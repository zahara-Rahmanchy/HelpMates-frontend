"use client"
import { useSendPayoutsToVolunteersMutation } from "@/redux/api/payoutsApi";
import { useGetApprovedApplicationDataQuery } from "@/redux/api/volunteerApplicationApi";
import { clearSelectedIds, toggleSelectedId } from "@/redux/slices/payoutSlice";
import { RootState } from "@/redux/store";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PayoutsTableHeads = ["Select","Name","Email", "Paypal Email","Amount","Details","Application Status","Payment Status"]

const SendPayouts = () => {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {data: userPayoutData, isLoading} = useGetApprovedApplicationDataQuery("");
  const selectedIds = useSelector((state: RootState) => state.payout.selectedIds);
  const [sendApplicationData] = useSendPayoutsToVolunteersMutation();

   console.log("user payoutdata: ",userPayoutData)

  /**************************----Sending Data-----***********************************************/

  const handleSelect = (id: string) => {
    dispatch(toggleSelectedId(id));
  };

  const handleSendPayouts = async(event:MouseEvent<HTMLButtonElement>) => {

        console.log("Sending payout for IDs:", selectedIds);
        try{
            event.preventDefault()
            setLoading(true)
            const applicationData = selectedIds.map((id:string )=> ({ volunteerApplicationId: id }));
            console.log("new payments: ",applicationData)
            const response = await sendApplicationData(applicationData).unwrap();
            console.log("respone: ",response)
            if (response?.count>0) {
                toast.success("New Opportunity added successfully");
                dispatch(clearSelectedIds());  
            } 
            else{
                toast.error("Something went wrong");
            }

        }catch(error:any){
            console.log("Error: ",error)
            toast.error(error?.message as string || "Something went wrong");
        }finally{
            setLoading(false)
        }
   
  };


    return (
        <Container>
           {isLoading && (
               <Backdrop
               sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
               open={isLoading}
               >
               <CircularProgress color="inherit" />
               </Backdrop>
           )}
           <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography component={"h5"} marginY={3} fontSize={"20px"} color={"primary.main"}>
                Send Payouts
            </Typography>
            <Button
                variant="contained"
            
                // color="primary"
                onClick={handleSendPayouts}
            
                disabled={selectedIds.length === 0} // disabled if no ID is selected
                sx={{ mt: 2 ,width:"20%",bgcolor:"secondary.main"}}
                >
                Send Payouts
            </Button>
           </Stack>
           <TableContainer component={Paper} sx={{overflow: "scroll"}}>
               <Table
             sx={{
               backgroundColor: "white",
               lg: {minWidth: 650},
               xs: {width: "100%"},
               borderRadius: "50px",
               overflowX: "scroll",
             }}
             aria-label="simple table"
           >
             <TableHead
               sx={{
                 bgcolor: "tertiary.light",
                 borderRadius: "100px",
                 overflowX: "scroll",
               }}
             >
               <TableRow>
                 {PayoutsTableHeads?.map((head, key) => (
                   <TableCell key={key}>
                     {" "}
                     <Typography
                       textAlign={"center"}
                       color="secondary.dark"
                       fontWeight={"bold"}
                       fontSize={"12px"}
                     >
                       {head}
                     </Typography>
                   </TableCell>
                 ))}
               </TableRow>
             </TableHead>
             <TableBody>
             
               {userPayoutData !== undefined &&
                 !isLoading &&
                userPayoutData.map((value: any, key: number) => (
                   <TableRow key={key}>
                    <TableCell>
                        <Checkbox
                        checked={selectedIds.includes(value.id)}
                        onChange={() => handleSelect(value.id)}
                        />
                    </TableCell>
                     <TableCell component="th" scope="row">
                       <Typography
                         textAlign={"center"}
                         fontSize={"14px"}
                         color={"primary.main"}
                         sx={{textWrap: "nowrap"}}
                       >
                         {value?.user?.name as string}
                       </Typography>
                     </TableCell>
                     <TableCell component="th" scope="row"  sx={{textAlign:"center"}}>
                       <Typography
                         fontSize={"14px"}
                         color={"primary.main"}
                         sx={{textWrap: "nowrap"}}
                       >
                         {value?.user?.email  as string}{" "}
                       </Typography>
                     </TableCell>
                     <TableCell component="th" scope="row"  sx={{textAlign:"center"}}>
                      
                         {value?.user?.paypalEmail  as string}
                     </TableCell>
                     <TableCell component="th" scope="row" sx={{textAlign:"center"}}>
                       {value?.opportunity?.stipend}
                     </TableCell>
                <TableCell component="th" scope="row" >
                     <Box display="flex" flexDirection="column" gap={0.5} alignItems={"center"}>
                       {/* Organization Badge */}
                         <Typography component="span" fontSize={"0.875rem"}>
                         {value?.opportunity?.title}
                       </Typography>
   
                     {/* Title Badge */}
                       <Box
                         component="span"
                         sx={{
                           display: "inline-block",
                          
                           py: 0.5,
                           borderRadius: "12px",
                           boxShadow:0,
                        //    bgcolor: "primary.main",
                           color: "primary.main",
                           fontWeight: 500,
                           fontSize: "0.8rem",
                         }}
                       >{`Org: ${value?.opportunity?.organization}`}
                         
                       </Box>
                     
                     </Box>
                   </TableCell>
   
                     <TableCell component="th" scope="row"  sx={{textAlign:"center",fontSize:"12px",color:"green"}}>
                       
                         {value?.status}
                      
                     </TableCell>

                      <TableCell component="th" scope="row"  sx={{textAlign:"center",fontSize:"14px",color:"orange",fontWeight:500}}>
                       
                         {value?.payouts[0]?.status}
                      
                     </TableCell>
               
                     
                   </TableRow>
                 ))}
             </TableBody>
           </Table>
         </TableContainer>
   
       </Container>
  )
}

export default SendPayouts
