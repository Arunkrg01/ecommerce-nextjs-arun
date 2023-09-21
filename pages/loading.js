
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function Loading() {
    return   (
      <div style={{border:"1px solid grey",borderRadius:"0.4rem"}}>
        <Skeleton count={5} /> 
      </div>
    )
  }