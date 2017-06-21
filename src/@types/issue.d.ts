
declare namespace StateIssue{

    interface infoIssue{
        Issue:Issue[]
        isFlatform:string;
        isScreenFlatFrom:{
            width:string,
            height:string
        };
        isMode:string;
        isSize:string;
        isZoom:string;
        isLoadding:boolean;
    }

    interface Issue{
        id:string;
        issue_name:string;
        cover_date:string;
        issue_no:string;
        published_date:string;
        published:boolean;
        detail:string;
        is_special:boolean;
        volume_no:string;
        default_issue:string;
        zenith_issue_id:string;
        zinio_issue_id:string;
        design_pack:string;
        designs:designs;
        sections:sections;
        
    }

    interface designs{
        id:string;
        url:string;
        version:number;
        reader_version:number;
    }
    
    interface sections{
        id:string;
        section_name:string;
        default_issue_section:string;
        landscape_view:string;
        portrait_view:string;
        title_color:string;
        description:string;
        default_landscape:string;
        default_portrait:string;
        priority:string;
        cover_video:string;
        cover_image:string;
        order:string;
        children_count:string;
        ads:string;
        stories:stories[];

    }
    interface stories{
        id:string;
        title:string;
        sub_title:string;
        author:author;
        tag:string;
        strap_line:string;
        intro:string;
        body:string;
        main_section_id:string;
        real_id:string;
        color:string;
        thumbnail:string;
        pdf_page_index:number;
        folio_numbers:number;
        order:string;
        type:string;
        url_alias:string;
        related_objects:related_objects;
        image_stories:images;
    }
    interface author{
        id:string;
        name:string;
        email:string;
        is_default:boolean;
    }
    interface related_objects{
        image:images;

    }
    interface images{
        id:string;
        name:string;
        source:string;
        caption:string;
        media_annotations:string;
        media_creator:string;
        image_url:string;
        portrait:boolean;
        width:string;
        height:string;
        legacy_id:string;
    }
}
