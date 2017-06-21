
declare namespace StateSite{

    interface InfoSite{
        channel:string;
        cover_date:string;
        detail:string;
        downloaded:boolean;
        has_preview:boolean;
        id:string;
        is_special:string;
        issue_name:string;
        modified_date:string;
        published:string;
        published_date:string;
        zenith_issue_id:string;
        coverImage:coverImage;
    }

    interface DesignPacks{
        id:string;
        reader_version:string;
        url:string;
        version:string;
    }

    interface coverImage{
        landscape:string;
        portrait:string;
        thumbnail:string;
    }

    interface FlatfromSite{
        isflatForm:boolean;
        isReload:boolean;
    }

    interface infoConfig{
        stringConfig:string;
    }

   

    interface ListSiteMagazine{
        listInfoSite:InfoSite[];
        isflatForm:boolean,
        isReload:boolean;
        isShowTab:string;
        listConfig:string[];
        isLoadding:boolean;
        query: string;
    } 
}
