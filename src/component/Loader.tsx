
// import Circula from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material';

const Loader = ()=> {
  // const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //       if(isSucess) setProgress(100);
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>

      <CircularProgress/>
    </div>
   
  );
}

export default Loader
