import { Injectable } from '@nestjs/common';
import { AccessToken, Room, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async _createRoom(param) {

    const livekitHost = process.env.LIVEKIT_URL;
    const roomService = new RoomServiceClient(livekitHost, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);

    const opts = {
      name: param.roomName,
      emptyTimeout: 10 * 60, // 10 minutes
      maxParticipants: 20,
    };
    return await roomService.createRoom(opts)

    // .then((room: Room) => {
    //   console.log('room created', room);
    // });

  }


  _getLiveKitToken(param: any) {
    // if this room doesn't exist, it'll be automatically created when the first
    // client joins
    const roomName = param.roomName;
    // identifier to be used for participant.
    // it's available as LocalParticipant.identity with livekit-client SDK
    const participantName = param.participantName;



    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
      identity: participantName,
    });
    at.addGrant({
      roomJoin: true, room: roomName, canPublish: true,
      canSubscribe: true,
    });

    const token = at.toJwt();
    // console.log('access token', token);
    return { liveKitToken: token, liveKitUrl: process.env.LIVEKIT_URL };
  }

  _getLiveKitUrl() {
    return { liveKitUrl: process.env.LIVEKIT_URL }
  }
}
