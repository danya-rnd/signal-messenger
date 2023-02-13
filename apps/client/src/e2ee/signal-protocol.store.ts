import { Utils } from "@/common/utils/helpers.utils";
import {
  KeyPairType,
  PreKeyPairType,
  SignedPreKeyPairType,
  SignedPublicPreKeyType,
} from "@privacyresearch/libsignal-protocol-typescript";

export class SignalProtocolStore {
  static getIdentity() {
    const identityKey = localStorage.getItem("registrationId");
    const registrationId = localStorage.getItem("identityKey");
    if (identityKey && registrationId) {
      return {
        registrationId,
        identityKey: {
          pubKey: Utils.base64ToArrayBuffer(JSON.parse(identityKey).pubKey),
          privKey: Utils.base64ToArrayBuffer(JSON.parse(identityKey).privKey),
        },
      };
    }
    throw new Error();
  }

  static storeIdentity(
    identityKey: KeyPairType<ArrayBuffer>,
    registrationId: number
  ) {
    localStorage.setItem("registrationId", String(registrationId));
    localStorage.setItem(
      "identityKey",
      JSON.stringify({
        pubKey: Utils.arrayBufferToBase64(identityKey.pubKey),
        privKey: Utils.arrayBufferToBase64(identityKey.privKey),
      })
    );
  }

  static getSignedPreKey() {
    const signedPreKey = localStorage.getItem("signedPreKey");
    if (signedPreKey) {
      return {
        keyId: JSON.parse(signedPreKey).keyId,
        publicKey: Utils.base64ToArrayBuffer(JSON.parse(signedPreKey).pubKey),
        signature: Utils.base64ToArrayBuffer(
          JSON.parse(signedPreKey).signature
        ),
      };
    }
    throw new Error();
  }

  static storeSignedPreKey(signedPreKey: SignedPublicPreKeyType) {
    localStorage.setItem(
      "signedPreKey",
      JSON.stringify({
        ...signedPreKey,
        publicKey: Utils.arrayBufferToBase64(signedPreKey.publicKey),
        signature: Utils.arrayBufferToBase64(signedPreKey.signature),
      })
    );
  }

  static getPreKeys() {
    const preKeys = localStorage.getItem("preKeys");
    if (preKeys) {
      const array = JSON.parse(preKeys);
      return array.map((n: PreKeyPairType<string>) => ({
        ...n,
        keypair: {
          pubKey: Utils.base64ToArrayBuffer(n.keyPair.pubKey),
          privKey: Utils.base64ToArrayBuffer(n.keyPair.privKey),
        },
      }));
    }
    throw new Error();
  }

  static storePreKeys(preKeys: PreKeyPairType<ArrayBuffer>[]) {
    localStorage.setItem(
      "preKeys",
      JSON.stringify(
        preKeys.map((n) => ({
          keyId: n.keyId,
          keypair: {
            pubKey: Utils.arrayBufferToBase64(n.keyPair.pubKey),
            privKey: Utils.arrayBufferToBase64(n.keyPair.privKey),
          },
        }))
      )
    );
  }
}
