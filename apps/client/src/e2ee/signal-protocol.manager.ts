import { Utils } from "@/common/utils/helpers.utils";
import {
  KeyHelper,
  SessionBuilder,
  SignedPreKeyPairType,
  SignedPublicPreKeyType,
  SignalProtocolAddress,
  SessionCipher,
  StorageType,
} from "@privacyresearch/libsignal-protocol-typescript";
import { SignalProtocolStore } from "./signal-protocol.store";

export class SignalProtocolManager {
  static async generateIdentityKeys() {
    const registrationId = KeyHelper.generateRegistrationId();
    const identityKey = await KeyHelper.generateIdentityKeyPair();

    SignalProtocolStore.storeIdentity(identityKey, registrationId);
  }

  static async generatePreKeys() {
    const { identityKey } = SignalProtocolStore.getIdentity();
    const preKeysCount = [...Array(10)];

    const preKeys = await Promise.all(
      preKeysCount.map(() => {
        return KeyHelper.generatePreKey(Utils.getRandomInt());
      })
    );

    const signedPreKeyId = Utils.getRandomInt();
    const signedPreKey = await KeyHelper.generateSignedPreKey(
      identityKey,
      signedPreKeyId
    );

    const publicSignedPreKey: SignedPublicPreKeyType = {
      keyId: signedPreKeyId,
      publicKey: signedPreKey.keyPair.pubKey,
      signature: signedPreKey.signature,
    };

    SignalProtocolStore.storeSignedPreKey(publicSignedPreKey);
    SignalProtocolStore.storePreKeys(preKeys);
  }

  static async encryptMessageAsync(userId: number, message: string) {
    const address = new SignalProtocolAddress(String(userId), 123);
    const sessionBuilder = new SessionBuilder(
      {} as any,
      new SignalProtocolAddress(String(userId), 123)
    );
    await sessionBuilder.processPreKey(SignalProtocolStore.getPreKeys());

    const senderSessionCipher = new SessionCipher({} as any, address);
    const ciphertext = await senderSessionCipher.encrypt(
      Utils.base64ToArrayBuffer(message)
    );
    return ciphertext;
  }

  static async decryptMessageAsync(userId: number, ciphertext: ArrayBuffer) {
    const address = new SignalProtocolAddress(String(userId), 123);
    const sessionCipher = new SessionCipher({} as any, address);

    const plaintext = await sessionCipher.decryptPreKeyWhisperMessage(
      ciphertext,
      "binary"
    );
    return Utils.arrayBufferToBase64(plaintext);
  }
}
