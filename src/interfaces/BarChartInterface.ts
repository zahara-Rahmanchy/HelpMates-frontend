interface IApplicationData {
  status: "PENDING" | "REJECTED" | "APPROVED";
  count: number;
}

export interface IBarChartData {
  barchartData: IApplicationData[];
}
