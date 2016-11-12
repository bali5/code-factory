import { JsonObject, JsonMember } from 'typedjson-npm';

@JsonObject
export class ConnectionState {
  @JsonMember
  session: string;

  @JsonMember
  address: string;  
}