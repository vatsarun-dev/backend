import pino from "pino";
export default pino({
  lvel: "info",
  transport: {
    target: "pino-pretty",
  },
});
