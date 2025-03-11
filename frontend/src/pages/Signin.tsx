import { Quote } from "../components/quote"
import { AuthComponent } from "../components/Auth"
export const Signin = () =>{
    return <div>
        <div className="grid grid-cols-2 lg:gird-cols-1">
            <div><AuthComponent type="signin"/></div>
          <div className="hidden lg:block"><Quote/></div>  
    </div>
</div>
}