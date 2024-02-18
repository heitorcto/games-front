import { Link } from "../links/link";
import { Gender } from "./gender";

export interface Payload {
  current_page: number
  data: Gender[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string | null
  prev_page_url: string | null,
}
