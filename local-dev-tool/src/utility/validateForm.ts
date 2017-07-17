class validateFrom{
    public checkValidateForm(configFrom,isError){
        if(configFrom.siteId == ""
            || configFrom.siteName == ""
            ){
            isError = "Please fill value on in input siteId && siteName!";
            return isError;
        }
        else if(!this.ValidURL(configFrom.siteLink)){
                isError = "Site Link not correct Link!"
        }
        else{
            isError = "";
        }
        return isError;
    }

    public ValidURL(str) {
        if(str.lenght > 0){
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex .test(str)) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }
    

}
export default new validateFrom();