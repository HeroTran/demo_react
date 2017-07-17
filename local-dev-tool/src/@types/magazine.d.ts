
declare namespace State{

    interface InfoMagazine{
        image:string;
        siteId:string;
        name:string;
    }

    interface InfoConfig{
        siteLink:string;
        siteId:string;
        siteName:string;
        siteUser:string;
        sitePass:string;
    }

   

    interface ListMagazine{
        listMagazine:InfoMagazine[];
        infoConfig : InfoConfig;
        isLoadding:boolean;
        isShow:boolean;
        isError:string;
        query: string;
    } 
}
